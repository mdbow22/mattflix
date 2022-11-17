import { NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"

const SignIn: NextPage<{providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null}> = ({ providers }) => {
  return (
    <>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name} className='mx-auto w-52 mt-10'>
          <button className='btn btn-primary' onClick={() => signIn(provider.id, {callbackUrl: '/admin'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default SignIn;

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}