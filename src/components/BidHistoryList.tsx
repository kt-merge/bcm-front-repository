export default function BidHistoryList() {
  const history = [
    { user: "익명#001", price: 32000, time: "1분 전" },
    { user: "익명#002", price: 31000, time: "3분 전" },
    { user: "익명#003", price: 30000, time: "5분 전" },
  ];

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">입찰 내역</h2>
      <ul className="space-y-2">
        {history.map((h, i) => (
          <li key={i} className="flex justify-between text-sm">
            <span>{h.user}</span>
            <span>₩{h.price.toLocaleString()}</span>
            <span className="text-gray-500">{h.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
