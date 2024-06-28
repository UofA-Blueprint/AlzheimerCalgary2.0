import { NavigationBar } from "../../components/NavigationBar";

function NavigationTest() {
	return (
		<div>
			{/* Using margin or padding for the parent tag can break the navigation bar. */}
			<NavigationBar userType="admin" />
		</div>
	);
}

export default NavigationTest;
