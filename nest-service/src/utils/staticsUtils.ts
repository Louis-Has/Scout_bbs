// FIXME 这里如果用import导入会报错，具体原因不明
// const sharp = require('sharp');


// 检查用户的文件权限
export function checkPermission(id: string, fileName: string) {
    return fileName.startsWith(id);
}

export function buildFileName(id: string, oriName: string, fileId: string, fileFirstDir?: string, fileDetailUrl?: string) {
    return `${fileFirstDir ? `${fileFirstDir}/` : ""}${id}/${fileDetailUrl ? `${fileDetailUrl}/` : ""}${fileId}${oriName.substring(oriName.lastIndexOf("."))}`;
}

export function buildSmallFileName(oriFileName: string) {
    return `small/${oriFileName}`;
}

// 图片高固定，大小等比缩
// export async function buildSmallFile(file: Buffer) {
//     return await sharp(file)
//         .resize(null, 364)
//         .sharpen()
//         .toBuffer();
// }