<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitad95e40ee0ed38d682e252d526ef2a83
{
    public static $files = array (
        '256558b1ddf2fa4366ea7d7602798dd1' => __DIR__ . '/..' . '/yahnis-elsts/plugin-update-checker/load-v5p5.php',
        '7fee3bf89c998506cbb1046dc45cf9ea' => __DIR__ . '/../..' . '/includes/Utils.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'S3S\\WP\\MediaChrome\\' => 19,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'S3S\\WP\\MediaChrome\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'S3S\\WP\\MediaChrome\\MediaControlBar' => __DIR__ . '/../..' . '/includes/MediaControlBar.php',
        'S3S\\WP\\MediaChrome\\MediaController' => __DIR__ . '/../..' . '/includes/MediaController.php',
        'S3S\\WP\\MediaChrome\\MediaPosterImage' => __DIR__ . '/../..' . '/includes/MediaPosterImage.php',
        'S3S\\WP\\MediaChrome\\Plugin' => __DIR__ . '/../..' . '/includes/Plugin.php',
        'S3S\\WP\\MediaChrome\\ProviderRegistry' => __DIR__ . '/../..' . '/includes/ProviderRegistry.php',
        'S3S\\WP\\MediaChrome\\Provider\\AbstractProvider' => __DIR__ . '/../..' . '/includes/Provider/AbstractProvider.php',
        'S3S\\WP\\MediaChrome\\Provider\\Vimeo' => __DIR__ . '/../..' . '/includes/Provider/Vimeo.php',
        'S3S\\WP\\MediaChrome\\Provider\\Wistia' => __DIR__ . '/../..' . '/includes/Provider/Wistia.php',
        'S3S\\WP\\MediaChrome\\Provider\\YouTube' => __DIR__ . '/../..' . '/includes/Provider/YouTube.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitad95e40ee0ed38d682e252d526ef2a83::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitad95e40ee0ed38d682e252d526ef2a83::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitad95e40ee0ed38d682e252d526ef2a83::$classMap;

        }, null, ClassLoader::class);
    }
}
