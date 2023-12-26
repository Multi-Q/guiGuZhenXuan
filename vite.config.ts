import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from "path";
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command,mode }) => {
  // 获取各种环境下对应的变量
  const env=loadEnv(mode,process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
         
        ],
        dts: path.resolve(path.resolve(__dirname, "src"), 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
         
          ElementPlusResolver()
        ],
        dts: path.resolve(path.resolve(__dirname, "src"), 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled:command==="serve",//保证开发阶段可以使用mock接口
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: "@import './src/style/variable.scss';",
        }
      }
    },

    // 代理跨域
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_SERVE,
          changeOrigin:true,
          rewrite:(path)=> path.replace(/^\/api/,""),
  
        }
      }
    }
  };
});

