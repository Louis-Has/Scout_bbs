import {get} from "./requset";

// areaType: 每日推荐 0, 海报模板 1, 3D模板 2, 热门素材 3
export const getPublicStaticsList = (areaType: string = '0') => {
    return get('/statics/public/getPublicStaticsList' + '?areaType=' + areaType);
};
