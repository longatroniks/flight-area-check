export const TestComponent: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-100 rounded-xl shadow-md font-sans">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-primary font-heading tracking-tight">Heading 1</h1>
        <h2 className="text-4xl font-semibold text-secondary font-heading leading-tight tracking-tight">Heading 2</h2>
        <h3 className="text-3xl font-medium text-tertiary font-heading tracking-tight">Heading 3</h3>
        <h4 className="text-2xl text-dark font-heading tracking-tight">Heading 4</h4>
        <h5 className="text-xl text-light-blue font-heading tracking-tight">Heading 5</h5>
        <h6 className="text-base text-primary font-heading tracking-tight">Heading 6</h6>
      </div>

      <div className="space-y-4">
        <p className="text-base leading-8 tracking-tight">
          This is a paragraph with your custom line height and letter spacing. The Open Sans font gives it a clean, modern look while maintaining excellent readability.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-primary text-white rounded font-medium hover:bg-opacity-90 transition-all">
          Primary Button
        </button>
        <button className="px-4 py-2 bg-secondary text-white rounded font-medium hover:bg-opacity-90 transition-all">
          Secondary Button
        </button>
        <button className="px-4 py-2 border border-primary text-primary rounded font-medium hover:bg-blue-50 transition-all">
          Outlined Button
        </button>
        <button className="px-4 py-2 bg-tertiary text-dark rounded font-medium hover:bg-opacity-90 transition-all">
          Tertiary Button
        </button>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow font-sans">
          <p className="tracking-tight">Default Container with Open Sans font</p>
        </div>
        <div className="p-4 bg-primary text-white rounded">
          <p className="tracking-tight">Colored Container (Primary)</p>
        </div>
        <div className="p-4 border rounded border-dashed border-[#ff5d64]">
          <p className="tracking-tight">Bordered Dashed Container</p>
        </div>
        <div className="p-4 bg-gradient-to-r from-primary to-[#ff5d64] text-white rounded">
          <p className="tracking-tight">Gradient Container</p>
        </div>
      </div>

      <div className="space-y-2 bg-white p-4 rounded">
        <h3 className="text-xl text-dark font-heading">Font Weights</h3>
        <p className="font-normal">Regular (400) - Open Sans</p>
        <p className="font-medium">Medium (500) - Open Sans</p>
        <p className="font-semibold">Semibold (600) - Open Sans</p>
        <p className="font-bold">Bold (700) - Open Sans</p>
      </div>
    </div>
  );
}