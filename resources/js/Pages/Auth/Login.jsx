import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Car, Loader2, User } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "testuser@example.com",
        password: "SecurePassword123!",
        remember: true,
    });

    const handleDemoFill = () => {
        setData({
            email: "testuser@example.com",
            password: "SecurePassword123!",
            remember: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => (window.location.href = route("dashboard.index")),
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                      
                        <div className="mt-6 space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-balance">
                                Manage your vehicle inventory with precision
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 space-y-6 border border-gray-200 dark:border-gray-700">
                        {status && (
                            <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-col w-full">
                                    <InputLabel
                                        value="Email address"
                                        className="flex w-full dark:text-gray-300 mb-1"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                                        placeholder="name@company.com"
                                        autoComplete="email"
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center mb-1">
                                        <InputLabel
                                            value="Password"
                                            className=" dark:text-gray-300"
                                        />
                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Remember me
                                </label>
                            </div>

                            <PrimaryButton
                                disabled={processing}
                                className="w-full justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </PrimaryButton>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                        Quick actions
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <button
                                    type="button"
                                    onClick={handleDemoFill}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Use Demo Credentials</span>
                                </button>

                                <Link
                                    href={route("register")}
                                    className="text-center text-sm text-gray-600 dark:text-gray-400 hover:underline"
                                >
                                    New to SokoMagari?{" "}
                                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                                        Create account
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
