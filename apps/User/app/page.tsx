import { authOptions } from "@repo/authoptions/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
// import Link from "next/link"
export default async function Page() {

  const session = await getServerSession(authOptions);
  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col md:max-w-[90%] md:m-auto">
      <main className="flex-1">
        <section className="w-full py-4 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Paytm@IIT Wallet: Your Digital Companion
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Securely manage your finances, make payments, and enjoy exclusive offers with the Paytm Wallet.
                    Download the app and experience the convenience of digital payments.
                  </p>
                </div>
              </div>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/online-money-transfer-from-wallet-to-bank-2246210-1939259.png"
                width="550"
                height="550"
                alt="Paytm Wallet"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="security" className="w-full py-4 "> 
          <div className="flex flex-col gap-5 items-center justify-center">
            {/* <div className="space-y-2"> */}
              <h2 className="text-3xl  font-bold tracking-tighter md:text-4xl/tight">
                Secure Your Finances with Paytm Wallet
              </h2>
              <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Paytm Wallet employs advanced security measures to protect your financial information and ensure the
                safety of your transactions.
              </p>
            <section id="features" className=" py-10 ">
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md p-6 space-y-4">
              {/* <WalletIcon className="h-8 w-8 text-[#00bcd4]" /> */}
              <h3 className="text-xl font-bold">Seamless Transactions</h3>
              <p className="text-gray-500 ">
                Paytm Wallet offers a seamless and hassle-free payment experience. Make payments with just a few taps.
              </p>
            </div>
            <div className="bg-gray-100  rounded-lg shadow-md p-6 space-y-4">
              {/* <LockIcon className="h-8 w-8 text-[#00bcd4]" /> */}
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-gray-500 ">
                Your payments are secure with Paytm Wallet. We use the latest encryption technology to protect your
                data.
              </p>
            </div>
          </div>
        </section>
            {/* </div> */}
          </div>
        </section>

      </main>
    </div>
  )
}

