import { Share2, Shield, EyeIcon } from 'lucide-react';

const Features = () => {
  return (
    <>
        <div className='flex gap-5 items-center justify-center'>
            <div className='border rounded-sm w-[15rem] px-5 py-10 flex flex-col justify-center items-center text-center mt-10 gap-2'>
                <div className='border rounded-full p-3 bg-purple-100'>
                    <Share2 className='text-purple-600'/>
                </div>
                <h2 className='font-semibold text-lg'>Share Brain</h2>
                <p className='text-xs text-slate-500'>Share your brain with anyone you want, one or whole.</p>
            </div>
            <div className='border rounded-sm w-[15rem] px-5 py-10 flex flex-col justify-center items-center text-center mt-10 gap-2'>
                <div className='border rounded-full p-3 bg-green-100'>
                    <Shield className='text-green-600'/>
                </div>
                <h2 className='font-semibold text-lg'>Privacy and Security</h2>
                <p className='text-xs text-slate-500'>Your data is secure and private within your workspace.</p>
            </div>
            <div className='border rounded-sm w-[15rem] px-5 py-10 flex flex-col justify-center items-center text-center mt-10 gap-2'>
                <div className='border rounded-full p-3 bg-yellow-100'>
                    <EyeIcon className='text-yellow-600'/>
                </div>
                <h2 className='font-semibold text-lg'>Easy Access Anytime</h2>
                <p className='text-xs text-slate-500'> Access your stored items from any device, anywhere.</p>
            </div>
        </div>
    </>
  )
}

export default Features