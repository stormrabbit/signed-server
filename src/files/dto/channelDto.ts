export class ChannelDto {
    readonly channelNames: string[]
    readonly fileName: string

    public static isValid(cDto:ChannelDto):boolean {
        return !!cDto.fileName && !! cDto.channelNames && !!cDto.channelNames.length;
    }
}