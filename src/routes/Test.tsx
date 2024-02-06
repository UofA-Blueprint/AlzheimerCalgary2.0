import TestSquare from "../components/TestSquare";

function Test() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-display1">Display 1</div>
      <div className="text-display2">Display 2</div>
      <div className="text-h1">H1 Heading</div>
      <div className="text-h2">H2 Heading</div>
      <div className="text-h3">H3 Heading</div>
      <div className="text-h4">H4 Heading</div>
      <div className="text-body-reg">Body Regular</div>
      <div className="text-body-sm">Body Small</div>
      <div className="text-sm">Small</div>
      <div className="text-tiny">Tiny</div>
      <div className="grid grid-rows-auto grid-cols-3 gap-2">
        <TestSquare className="bg-primary-light" />
        <TestSquare className="bg-primary-main" />
        <TestSquare className="bg-primary-dark" />
        <TestSquare className="bg-secondary-light" />
        <TestSquare className="bg-secondary-main" />
        <TestSquare className="bg-secondary-dark" />
        <TestSquare className="bg-accent" />
        <TestSquare className="bg-status-red-main" />
        <TestSquare className="bg-status-blue-main" />
        <TestSquare className="bg-status-green-main" />
        <TestSquare className="bg-status-yellow-main" />
        <TestSquare className="bg-status-orange-main" />
        <TestSquare className="bg-neutrals-dark-100" />
        <TestSquare className="bg-neutrals-light-200" />
        <TestSquare className="bg-profile-tulip" />
        <TestSquare className="bg-profile-gold" />
        <TestSquare className="bg-profile-lime" />
        <TestSquare className="bg-profile-jade" />
        <TestSquare className="bg-profile-water" />
        <TestSquare className="bg-profile-air" />
        <TestSquare className="bg-profile-lilac" />
        <TestSquare className="bg-profile-candy" />
        <TestSquare className="bg-status-blue-light" />
      </div>
    </div>
  );
}

export default Test;
