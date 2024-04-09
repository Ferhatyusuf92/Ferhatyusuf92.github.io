const Loading = () => {
  return (
    <div className='text-center'>
      <button
        className='btn btn-primary mt-5'
        type='button'
        disabled
      >
        <span
          className='spinner-border spinner-border-sm'
          aria-hidden='true'
        ></span>
        <span
          role='status'
          className='ms-2'
        >
          Loading...
        </span>
      </button>
    </div>
  );
};

export default Loading;
