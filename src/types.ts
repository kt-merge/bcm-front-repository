export interface ProductCardProps {
  product: {
    id: number;
    title: string;
    image: string;
    currentBid: number;
    bids: number;
    timeLeft: string;
    status: string;
  };
}
