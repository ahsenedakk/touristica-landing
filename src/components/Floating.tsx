import { useState } from 'react';
import { MessageCircle, X, Phone, Send } from 'lucide-react';

export function Floating() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setName('');
      setPhone('');
    }, 3200);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {open && (
          <div className="w-[330px] max-w-[calc(100vw-2.5rem)] animate-fade-up overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-deep/10">
            <div className="relative bg-gradient-to-br from-deep to-ocean p-5 text-white">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-aqua/20 ring-1 ring-aqua/40">
                    <Phone className="h-5 w-5 text-aqua" />
                  </div>
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-deep" />
                </div>
                <div>
                  <p className="text-[14px] font-bold">Derya Aydın</p>
                  <p className="text-[11.5px] text-white/70">Kıdemli Tatil Danışmanı · 12 yıldır Touristica’da</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-white/70">
                Şu an çevrimiçi — ortalama 45 sn içinde yanıtlar
              </p>
            </div>

            {sent ? (
              <div className="p-6 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-100">
                  <Send className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-[14px] font-bold text-deep">Talebiniz alındı, Derya sizi arayacak</p>
                <p className="mt-1 text-[12.5px] text-deep/60">Danışmanınız bugün içinde sizi arayacak. İyi tatiller şimdiden.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="p-5">
                <p className="mb-3 text-[13px] font-semibold text-deep">Kararsız mı kaldınız? Danışmanınız halletsin.</p>
                <div className="space-y-2.5">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="h-11 w-full rounded-xl border border-deep/10 bg-mist px-3.5 text-[14px] text-deep placeholder:text-deep/40 focus:border-aqua focus:outline-none focus:ring-2 focus:ring-aqua/20"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon numaranız"
                    className="h-11 w-full rounded-xl border border-deep/10 bg-mist px-3.5 text-[14px] text-deep placeholder:text-deep/40 focus:border-aqua focus:outline-none focus:ring-2 focus:ring-aqua/20"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua to-ocean text-[14px] font-bold text-white shadow-lg shadow-aqua/30 transition hover:shadow-aqua/50"
                >
                  <Phone className="h-4 w-4" />
                  Beni Arayın
                </button>
                <p className="mt-2.5 text-center text-[11px] text-deep/45">Telefonla rezervasyonda telefona özel ek indirim</p>
              </form>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-aqua to-ocean text-white shadow-2xl shadow-aqua/40 transition hover:scale-105"
          aria-label="Danışmana yazın"
        >
          {!open && (
            <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-aqua" />
          )}
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
