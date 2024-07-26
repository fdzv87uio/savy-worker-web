interface ApiResponseCreateEvent {
  success: boolean;
  statusCode: string;
  data?: EventData;
  error?: any;
}

interface EventData {
  title: string;
  slug: string;
  description: string;
  url: string;
  eventType: string;
  eventMode: string;
  startDate: string;
  startTime: string;
  eventEnds: boolean;
  endDate: string;
  endTime: string;
  occurenceCount: number;
  isFrecuency: boolean;
  frecuency: string[];
  frecuencyStatus: string[];
  location: string;
  address: string;
  city: string;
  author: string;
  userId: string;
  preferenceListIds: string[];
  guestList: any[]; // Define the type for guestList appropriately
  images: any[]; // Define the type for images appropriately
  videos: any[]; // Define the type for videos appropriately
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
