// aiTextResultType
export interface AiTextResult {
    status: 'warning' | 'danger' | 'normal' | 'repair' | 'offline';
    message: string;
}