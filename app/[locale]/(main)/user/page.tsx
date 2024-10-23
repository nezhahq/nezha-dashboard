export default function User() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 lg:px-0">
            <div className="flex justify-between mb-4 mt-4 items-center">
                <section className="flex flex-col gap-2">
                    <h2 className="mt-0 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
                        用户
                    </h2>
                    <p className="text-sm font-medium" >
                        你可以在这里查看和管理全部的用户。
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