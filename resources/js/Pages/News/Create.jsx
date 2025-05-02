import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        excerpt: "",
        content: "",
        featured_image: null,
        is_published: false,
        published_at: "",
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.news.store"));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("featured_image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-6">
                                Create News Article
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="excerpt"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Excerpt
                                    </label>
                                    <textarea
                                        id="excerpt"
                                        value={data.excerpt}
                                        onChange={(e) =>
                                            setData("excerpt", e.target.value)
                                        }
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.excerpt && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Content
                                    </label>
                                    <div className="border rounded-lg overflow-hidden">
                                        <MdEditor
                                            value={data.content}
                                            style={{ height: "500px" }}
                                            renderHTML={(text) =>
                                                mdParser.render(text)
                                            }
                                            onChange={({ text }) =>
                                                setData("content", text)
                                            }
                                            view={{
                                                menu: true,
                                                md: true,
                                                html: true,
                                            }}
                                            canView={{
                                                menu: true,
                                                md: true,
                                                html: true,
                                                fullScreen: true,
                                                hideMenu: true,
                                            }}
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="featured_image"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Featured Image
                                    </label>
                                    <input
                                        type="file"
                                        id="featured_image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full"
                                    />
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="mt-2 h-48 object-cover rounded-lg"
                                        />
                                    )}
                                    {errors.featured_image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.featured_image}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_published"
                                            checked={data.is_published}
                                            onChange={(e) =>
                                                setData(
                                                    "is_published",
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                                        />
                                        <label
                                            htmlFor="is_published"
                                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            Publish immediately
                                        </label>
                                    </div>

                                    {!data.is_published && (
                                        <div>
                                            <label
                                                htmlFor="published_at"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Schedule Publication
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="published_at"
                                                value={data.published_at}
                                                onChange={(e) =>
                                                    setData(
                                                        "published_at",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        Create News Article
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
