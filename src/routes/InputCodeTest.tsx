import { InputCode } from "@/components/InputCode";

function NavigationTest() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <InputCode
        type="email"
        error={true}
        required={true}
      />
    </div>
  );
}

export default NavigationTest;
