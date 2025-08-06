

export interface UserDataProps {
  cell: string;
  dob: {
    age: number;
    date: string; // ISO date string
  };
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  };
  location: {
    city: string;
    country: string;
    postcode: string;
    state: string;
    street: {
      name: string;
      number: number;
    };
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      description: string;
      offset: string;
    };
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: string;
  };
}


export interface CardsProps {
  loading: boolean;
  errorMessage: string;
  userData: UserDataProps[] | undefined;
  filteredUser: UserDataProps[] | undefined;
  userDetail: UserDataProps | undefined
  searchKeyword: string;
  setSearchKeyword: (arg: string) => void;
  setUserDetail: (arg: UserDataProps) => void;
  pagination: PaginationProps
  setPageNumber: (arg: number) => void;
  setPageSize:(arg:number)=>void;
}

export interface PaginationProps {
  totalItems: number;
  from: number;
  to: number;
  pageNumber: number;
  pageSize: number;
  currentPage: number;
  lastPage: number;
}

export interface PaginationComponentProps {
  totalItems: number;
  from: number;
  to: number;
  pageNumber: number;
  pageSize: number;
  currentPage: number;
  lastPage: number;
  setPageNumber: (arg: number) => void;
  setPageSize: (arg: number) => void;
}

export interface ViewMoreModalProps{
  openModal: boolean;
  closeModal: () => void;
  userDetail: UserDataProps | undefined
}

