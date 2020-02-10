// user.ts
export interface LoginResponse {
    access_token: string;
    data: any;
    user_id: string;
    name: string;
    type: string;
    status: string;
    message: string;
}
