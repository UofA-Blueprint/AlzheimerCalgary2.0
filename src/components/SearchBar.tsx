//#region imports
import { MagnifyingGlass } from "@phosphor-icons/react";
import { capitalizeSearchTerm } from "@/utils";
//#endregion

//#region interfaces
interface SearchBarProps {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	handleClick: () => void;
	placeholder?: string;
}
//#endregion

function SearchBar({ setSearch, handleClick, placeholder }: SearchBarProps) {
	const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleClick();
		}
	};

	return (
		<div className="flex flex-row h-full w-full">
			<input
				title={"Search"}
				placeholder={placeholder}
				className="border-2 border-neutrals-light-300 bg-neutrals-light-300 flex-1 p-2 lg:p-4 xl:p-6 rounded-l-lg text-sm lg:text-base xl:text-xl xl:leading-6"
				onChange={(e) =>
					setSearch(capitalizeSearchTerm(e.target.value))
				}
				onKeyDown={(e) => handleEnterKey(e)}
			/>
			<button
				className="h-full aspect-square flex items-center justify-center rounded-r-lg border-2 border-primary-main bg-primary-main hover:bg-primary-light cursor-pointer"
				onClick={handleClick}
				type="button"
				title="Search"
			>
				<MagnifyingGlass
					color="white"
					size="24"
				/>
			</button>

		</div>
	);
}

export default SearchBar;
