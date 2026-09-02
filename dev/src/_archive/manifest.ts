

const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const az = 'abcdefghijklmnopqrstuvwxyz355445gjkufvxsfhi8tfdef';
const base10 = "0123456789";
//const base = () => `{$num
function buildManifest(lines: string[]) {
    const manifest = [];
    const record = {};
    lines.forEach((v, i) => {
        const word = Buffer.from(v, 'binary');
        manifest[i] ? null :
            manifest[i] = [];
        word.forEach((form, num) => {
            const bind = {};
            form = Buffer.from([form], 'binary').toString('ascii')
            bind[bind[form] = num] = form
            manifest[i].push(bind);
            if (record[form] === num) throw new Error('exist');
            if (record[form] === form) throw new Error('exist');
            if (record[num] === num) throw new Error('exist');
            if (record[num] === form) throw new Error('exist');
            record[record[form] = num] = form;
        });
    });
    return record;
}
console.log(Object.entries(buildManifest([base10, AZ, az])));
console.log(Object.entries(buildManifest([base10, AZ, az])).length - (AZ.length + az.length + base10.length));
