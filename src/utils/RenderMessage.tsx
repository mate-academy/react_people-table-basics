export function renderMessage(message: string) {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}
