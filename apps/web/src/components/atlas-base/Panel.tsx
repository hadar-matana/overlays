export default function Panel({ children }: { children: React.ReactNode }) {
    return (
      <div
        className="rounded-b-[8px] rounded-t-none opacity-[0.95] shadow-[0_16px_32px_rgba(5,8,15,0.35)]"
        style={{
          width: '300px',
          height: '772px',
          padding: 'var(--panel-pad-y) var(--panel-pad-x)',
          background: `linear-gradient(180deg, var(--panel-bg-1) 0%, var(--panel-bg-2) 100%)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--panel-gap)',
        }}
      >
        {children}
      </div>
    );
  }
  