import React, { FormEvent } from "react";

const SearchBox: React.FC = () => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}
    className="flex align-middle justify-center p-6"
    >
      <input type="text"
      className="px-3"
      />

    </form>
  )
}

export default SearchBox;