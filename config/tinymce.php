<?php

return [
    'api_key' => env('TINYMCE_API_KEY', ''),

    'init' => [
        'height' => 500,
        'menubar' => true,
        'plugins' => [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount'
        ],
        'toolbar' => 'undo redo | blocks | ' .
            'bold italic forecolor | alignleft aligncenter ' .
            'alignright alignjustify | bullist numlist outdent indent | ' .
            'removeformat | help',
        'content_style' => 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
    ],
];
