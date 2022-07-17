import React, { useRef } from "react";

type SearchFormProps = {
  setSearchQuery: (value: string) => void;
  loading: Boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({ setSearchQuery, loading }) => {
  const queryInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const query = queryInputRef?.current?.value;
    if (query) {
      setSearchQuery(query);
    }
  };

  return (
    <form className="mb-2 flex flex-row" onSubmit={handleSubmit}>
      <input
        className="rounded w-96 mr-2"
        type="text"
        placeholder="Search Twitter"
        ref={queryInputRef}
      />
      <button
        className="flex flex-row ml-auto items-center w-36 justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150"
        type="submit"
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? "Loading" : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
