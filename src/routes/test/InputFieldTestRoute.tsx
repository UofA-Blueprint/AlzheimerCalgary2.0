import Button from "@/components/Button";
import InputField from "@/components/InputField";

function InputFieldTestRoute() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutrals-dark-100">
      {/* Required Field */}
      <InputField type="text" error={false} label="Input Text" required={true}/>
      {/* Optional field */}
      <InputField type="text" error={false} label="Input Text" required={false}/>
      {/* Error field */}
      <InputField type="text" error={true} label="Input Text" required={true}/>
      {/* No label */}
      <InputField type="text" error={false} required={false}/>


    </div>
  );
}

export default InputFieldTestRoute;
