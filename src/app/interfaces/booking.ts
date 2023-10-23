export interface Booking{
    reserveId: number,
    meetingRoomId: number,
    reserveDate: string,
    startTime: string,
    endTime: string,
    userId: string,
    hours?: string,
    meetingRoomName?: string
}
