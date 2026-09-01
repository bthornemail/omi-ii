export const five = await Promise.resolve(5);
if (import.meta.main) ()=>{

spawn(execPath, [
    '--input-type=module',
    '--eval',
    // Never-resolving Promise:
    'await new Promise(() => {})',
]).once('exit', (code) => {
    console.log(code); // Logs `13`
});

main()
}
