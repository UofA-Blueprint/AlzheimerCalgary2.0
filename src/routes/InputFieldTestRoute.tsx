import Button from "@/components/Button";
import InputField from "@/components/InputField";

function InputFieldTestRoute() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutrals-dark-100">
      {/* Required Field */}
      <div className="w-32 h-40">
        <InputField
          type="text"
          error={false}
          label="Input Text"
          required={true}
        />
      </div>
      {/* Optional field */}
      <div className="w-12 h-12"></div>
      <div className="w-32 h-24">
        <InputField
          type="text"
          error={false}
          label="Input Text"
          required={false}
        />
      </div>
      {/* Error field */}
      <div className="w-12 h-12"></div>
      <div className="w-32 h-12">
        <InputField
          type="text"
          error={true}
          label="Input Text"
          required={true}
        />
      </div>
      <div className="w-12 h-12"></div>
      <div className="w-32 h-12">
        {/* No label */}
        <InputField type="text" error={false} required={false} />
      </div>
    </div>
  );
}

export default InputFieldTestRoute;
