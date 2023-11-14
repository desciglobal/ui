import clsx from 'clsx';

export const Field = ({ id, label, type, register, errorMessage }) => (
  <div className="form-control w-full mb-4" key={id}>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        className={clsx(
          "input-bordered input w-full rounded-4xl p-[10px] text-[14px] tracking-wide bg-slate-100",
          { "h-32": type === 'textarea' },
          { "input-error": errorMessage }
        )}
        id={id}
        name={id}
        {...register(id)}
      />
    ) : (
      <input
        type={type}
        className={clsx(
          "input-bordered input w-full rounded-4xl bg-slate-100 p-[10px] text-[14px] tracking-wide",
          { "input-error": errorMessage }
        )}
        id={id}
        name={id}
        maxLength={id === "event_title" ? 80 : undefined}
        {...register(id)}
      />
    )}
    {errorMessage && (
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    )}
  </div>
);
