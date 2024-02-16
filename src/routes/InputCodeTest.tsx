import { InputCode } from "@/components/InputCode";

function NavigationTest() {
  return (
    <div>
      <InputCode
        type="email"
        error={true}
        required={true}
      />
    </div>
  );
}

export default NavigationTest;
