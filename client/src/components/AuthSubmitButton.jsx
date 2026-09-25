function AuthSubmitButton(props) {
  const { isLoading, processingText, actionText } = props;

  return (
    <div className="flex flex-col  items-center mt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="
              w-full
              py-2
              rounded-lg
              font-semibold
              bg-cyan-400
              text-white
              hover:bg-cyan-500
              cursor-pointer
              focus:ring-2
              focus:ring-cyan-500/60
              disabled:opacity-50
              disabled:cursor-not-allowed"
      >
        {isLoading ? processingText : actionText}
      </button>
    </div>
  );
}

export default AuthSubmitButton;
