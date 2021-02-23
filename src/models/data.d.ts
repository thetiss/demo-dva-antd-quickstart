export interface IUserInfoOfAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [number, number]
};

export interface IUserInfoOfCompany {
    name: string;
    catchPhrase: string;
    info: string;
}

export interface ISingleUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IUserInfoOfAddress;
    phone: string;
    website: string;
    company: IUserInfoOfCompany;
};

export interface ISingleUserByZhang {
    id: number;
    name: string;
    email: string;
    create_time: Date;
    update_time: Date;
    status: number;
}
export interface IUserState {
    data: ISingleUserByZhang[];
    meta: {
        total: number;
        per_page: number;
        currentPage: number;
    }
};