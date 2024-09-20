
import '../styles/global.css'
import GeneralLayout from '@/components/GeneralLayout'

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
    return (
        <GeneralLayout>
            <Component {...pageProps} />
        </GeneralLayout>
    )
}

export default MyApp