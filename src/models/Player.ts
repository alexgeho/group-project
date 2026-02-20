export interface IPlayer {
    id: string,
    name: string,
    points: number,
    artifacts: string[],
    roomTimes: { roomId: number, time: number }[],
    roomsCompleted: number[]
}