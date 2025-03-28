import { APP_NAME } from '@/lib/consts'
import { ShareIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { ZDK } from '@zoralabs/zdk'

const API_ENDPOINT = 'https://api.zora.co/graphql'
const zdk = new ZDK({ endpoint: API_ENDPOINT })

const args = {
	where: {
		collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
	},
	pagination: { limit: 500 },
	includeFullDetails: false,
	includeSalesHistory: false,
}

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Sketch'), { ssr: false })

const Home = ({ zorbs }) => (
	<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
		<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
			<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
				<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
			</div>
			<div>
				<DynamicComponentWithNoSSR zorbs={zorbs} />
			</div>

			<div className="flex justify-center mt-4 sm:items-center sm:justify-between">
				<div className="text-center text-sm text-gray-500 sm:text-left">
					<div className="flex items-center">
						<ShareIcon className="-mt-px w-5 h-5 text-gray-400" />

						<a
							target="__blank"
							href="https://github.com/SweetmanTech/zorb-visualizer"
							className="ml-1 underline"
						>
							Share
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export async function getStaticProps(context) {
	const response = await zdk.tokens(args)
	let zorbs = response.tokens.nodes.map(zorb => zorb.token.image.url)

	return {
		props: { zorbs }, // will be passed to the page component as props
	}
}

export default Home
