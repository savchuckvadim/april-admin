import { ClientRegionType, RegionType } from "../../types/types";


export const getClientRegionFromRegion = (region: RegionType, ownAbs = null as number | null): ClientRegionType => ({
    number: region.number,
    regionNumber: region.number,
    abs: region.abs,
    isOwnAbs: ownAbs ? true : false,
    ownAbs: ownAbs && null
}) 