import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/useAuth';

export default function LoginPage() {
  const formRef = useRef(null);
  const auth = useAuth();
  const submitHandle = event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(formRef.current));
    auth.signIn(data.email, data.password);
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-auto">
              <Image
                alt="Workflow"
                height="40"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                width="40"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form ref={formRef} className="mt-8 space-y-6" onSubmit={submitHandle}>
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only" htmlFor="email-address">
                  Email address
                </label>
                <input
                  required
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="email-address"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  passHref
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  href="/forgot-password"
                >
                  <a href="/replace">Forgot your password?</a>
                </Link>
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
