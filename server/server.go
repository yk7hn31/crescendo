package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
)

func main() {
	http.HandleFunc("/search", searchHandler)
	http.HandleFunc("/lookup", lookupHandler)

	fmt.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func setCommonHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func handlePreflight(w http.ResponseWriter, r *http.Request) bool {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}

func handleRequest(w http.ResponseWriter, baseURL string, params url.Values) {
	fullURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())

	// Make the GET request to the iTunes API
	resp, err := http.Get(fullURL)
	if err != nil {
		http.Error(w, "Failed to fetch data from iTunes API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read iTunes API response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header and write the response
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func lookupHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)

	if handlePreflight(w, r) {
		return
	}

	// Only accept GET requests
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	limit := r.URL.Query().Get("limit")
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing 'id' query parameter", http.StatusBadRequest)
		return
	}

	baseURL := "https://itunes.apple.com/lookup"
	params := url.Values{}
	params.Add("id", id[1:])
	params.Add("limit", limit)
	params.Add("entity", "song")

	handleRequest(w, baseURL, params)
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)

	if handlePreflight(w, r) {
		return
	}

	// Only accept GET requests
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	term := r.URL.Query().Get("term")
	if term == "" {
		http.Error(w, "Missing 'term' query parameter", http.StatusBadRequest)
		return
	}

	entity := r.URL.Query().Get("entity")
	if entity == "artist" {
		entity = "musicArtist"
	} else if entity == "all" {
		entity = "musicArtist,album,song"
	}

	baseURL := "https://itunes.apple.com/search"
	params := url.Values{}
	params.Add("term", term)
	params.Add("entity", entity)
	params.Add("media", "music")
	params.Add("limit", "10")

	handleRequest(w, baseURL, params)
}
