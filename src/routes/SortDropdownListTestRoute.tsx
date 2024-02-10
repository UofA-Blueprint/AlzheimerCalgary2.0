import DropdownItem from "../components/DropdownItem";
import SortDropdownList from "../components/SortDropdownList";

function SortDropdownListTestRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-h2">Hello</div>
      <div className="text-body-reg">
        Is this the sort dropdown list that you looking for?😩
      </div>
      <div className="w-1/4">
        <SortDropdownList />
      </div>
      <div>What happen If I do this?</div>
    </div>
  );
}

export default SortDropdownListTestRoute;
