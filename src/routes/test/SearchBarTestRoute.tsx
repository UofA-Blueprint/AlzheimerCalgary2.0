import SearchBar from "../../components/SearchBar";

function SearchBarTest() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<SearchBar target={"name"} />
			<SearchBar target={"photo ID"} />
		</div>
	);
}

export default SearchBarTest;
