import { InputCode } from "@/components/InputCode";

function NavigationTest() {
  return (
    <div className="flex flex-col gap-y-12 w-full h-screen items-center justify-center">
      {/* TODO: Passing inputs */}
      <InputCode
        label="Input Code"
        error={false}
        required={false}
      />
      <InputCode
        label="Passcode"
        error={true}
        required={true}
      />
    </div>
  );
}

export default NavigationTest;
