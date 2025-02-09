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
				placeholder={placeholder}
				className="px-4 py-4 md:px-8 rounded-l-xl bg-slate-100 h-full w-full"
				onChange={(e) =>
					setSearch(capitalizeSearchTerm(e.target.value))
				}
				onKeyDown={(e) => handleEnterKey(e)}
			/>
			<button
				className="rounded-r-xl bg-primary-main px-3 hover:bg-primary-light cursor-pointer"
				onClick={handleClick}
				type="button"
				title="Search"
			>
				<MagnifyingGlass
					color="white"
					size="1.4rem"
				/>
			</button>
		</div>
	);
}

export default SearchBar;
