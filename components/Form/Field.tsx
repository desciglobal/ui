export const Field = ({ id, label, type, register, errorMessage }) => (
  <div className="form-control w-full mb-4" key={id}>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      className={`input-bordered input w-full rounded-4xl bg-base-200 p-[10px] text-[14px] tracking-wide  ${
        errorMessage ? "input-error" : ""
      }`}
      id={id}
      name={id}
      maxLength={id === "event_title" ? 80 : undefined}
      {...register(id)}
    />
    {errorMessage && (
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    )}
  </div>
);
