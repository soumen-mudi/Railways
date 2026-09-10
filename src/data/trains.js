export const trains = [
  {
    id: 1,
    number: "12301",
    name: "Howrah Rajdhani Express",
    from: "Howrah",
    to: "New Delhi",
    departure: "16:50",
    arrival: "10:00",
    duration: "17h 10m",
    classes: ["1A", "2A", "3A"],
    fare: 1895,
    seats: 24
  },
  {
    id: 2,
    number: "12951",
    name: "Mumbai Rajdhani Express",
    from: "Mumbai Central",
    to: "New Delhi",
    departure: "17:00",
    arrival: "08:35",
    duration: "15h 35m",
    classes: ["1A", "2A", "3A"],
    fare: 1650,
    seats: 12
  },
  {
    id: 3,
    number: "12019",
    name: "Howrah - Ranchi Shatabdi",
    from: "Howrah",
    to: "Ranchi",
    departure: "06:05",
    arrival: "10:10",
    duration: "4h 05m",
    classes: ["CC", "EC"],
    fare: 780,
    seats: 38
  },
  {
    id: 4,
    number: "12860",
    name: "Gitanjali Express",
    from: "Mumbai CSMT",
    to: "Howrah",
    departure: "06:00",
    arrival: "09:20",
    duration: "27h 20m",
    classes: ["2A", "3A", "SL"],
    fare: 920,
    seats: 56
  }
];

export const popularRoutes = [
  { from: "Delhi", to: "Mumbai", fare: "₹1,245", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80" },
  { from: "Kolkata", to: "New Delhi", fare: "₹1,320", image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=900&q=80" },
  { from: "Chennai", to: "Bengaluru", fare: "₹890", image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=900&q=80" },
  { from: "Mumbai", to: "Pune", fare: "₹410", image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=900&q=80" }
];