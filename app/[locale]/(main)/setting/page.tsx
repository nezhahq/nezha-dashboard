export default function Setting() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 lg:px-0">
            <div className="flex justify-between mb-4 mt-4 items-center">
                <section className="flex flex-col gap-2">
                    <h2 className="mt-0 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
                        设置
                    </h2>
                    <p className="text-sm font-medium" >
                        你可以在这里对哪吒面板进行设置。
                        <a
                            href="#"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            了解更多↗
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}