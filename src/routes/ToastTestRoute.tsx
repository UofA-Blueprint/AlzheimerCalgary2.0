import Toast from "@/components/Toast";

function ToastTestRoute() {
  return (
    <div className="flex flex-col justify-center gap-4 items-center min-h-screen">
        <Toast severity="success" message="This is a success message" />
        <Toast severity="error" message="This is an error message" />
        <Toast severity="warning" message="This is a warning message" />
        <Toast severity="info" message="This is an info message" />
        <Toast severity="neutral" message="This is a neutral message"/>
        <Toast message="This is a message with no severity" />
    </div>
  );
}

export default ToastTestRoute;