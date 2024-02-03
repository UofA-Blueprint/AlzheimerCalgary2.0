import NavigationBar from "../components/NavigationBar";

function NavigaionTest() {
  return (
    <div>
      {/* Using margin or padding for the parent tag can break the navigation bar. */}
      <NavigationBar userType="admin" />
    </div>
  );
}

export default NavigaionTest;
