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

	fmt.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight (OPTIONS) requests
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Only accept GET requests
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract the 'term' query parameter
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

	// Build the iTunes Search API URL
	baseURL := "https://itunes.apple.com/search"
	params := url.Values{}
	params.Add("term", term)
	params.Add("entity", entity)
	params.Add("media", "music")
	params.Add("limit", "10")

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
