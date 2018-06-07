/**
 * 将c上的所有属性复制到o上 若defaults存在，则先将defaults的属性复制到o上，再将c的属性复制到o上
 */
var apply = function( o, c, defaults )
{
    if( defaults )
    {
        Ext.apply(o, defaults);
    }

    if( o && c && typeof c == 'object' )
    {
        for( var p in c )
        {
            o[p] = c[p];
        }
    }

};

/**
 * 将overrides对象的属性全部复制到src的prototype上
 */
var override = function( src, overrides )
{
    if( overrides )
    {
        var p = src.prototype;
        apply(p, overrides);
    }
};

/**
 * extend是一个自执行的函数，返回一个函数，运用了闭包，因为io与oc属性都是静态的，方便访问
 */
var extend = (function()
{

    var io = function( o )
    {

        // console.log(this);

        // subclassPrototype.override = io;
        // 后面有这句调用，调用时this指向的是subclassPrototype
        // 也就是说可以这样：
        // Children.prototype.override({name:'ddddd'});
        for( var m in o )
        {
            this[m] = o[m];
        }
    };

    var oc = Object.prototype.constructor;

    // 1、extend(subclass,superclass,overrides);
    // 2、extend(superclass,override);
    // 如果是3个参数，typeof superclass 为function
    // 若果是2个参数，typeof superclass 为object
    // 所以，下面的任务就是将2个参数的转化为3个参数
    // 即：将superclass赋给overrides
    // 将subclass赋给superclass
    // 然后判断overrides里是否覆盖了contructor
    // 若覆盖了，则将overrides.contructor作为subclass，而在overrides.contructor中一般会有调用父类构造函数的语句
    // 若没有覆盖，则新建一个构造方法，这个方法就是直接调用父类的构造方法（函数伪装）  
    return function( subclass, superclass, overrides )
    {
        if( typeof superclass === 'object' )
        {
            overrides = superclass;
            superclass = subclass;
            subclass = overrides.constructor != oc ? overrides.constructor : function()
            {
                superclass.apply(this, arguments);
            }
        }

        // 新建一个空的构造函数
        var F = function()
        {
        };

        var subclassPrototype, superclassPrototype;

        superclassPrototype = superclass.prototype;

        // 将F的prototype指向superclass的prototype
        // 这样，有个过渡，就不用new superclass了
        F.prototype = superclassPrototype;

        // 经典的继承方式，基于原型链
        subclassPrototype = subclass.prototype = new F();

        // 纠正superclass.prototype.contructor的指向
        subclassPrototype.constructor = subclass;
        // 新增一个superclass指向父类的prototype，便于在subclass的构造方法里调用父类
        // 形如：Children.superclass.constructor.call(this,arguments);
        subclass.superclass = superclassPrototype;

        // 纠正父类原型的constructor的指向
        // 如果没有指定父类的构造方法，则让其指向superclass
        if( superclassPrototype.constructor == oc )
        {
            superclassPrototype.constructor = superclass;
        }

        // 为subclass添加一个静态方法overrides，作用是在subclass的prototype上复制属性
        subclass.override = function( o )
        {
            override(subclass, o);
        };

        // 在subclass.prototype上注册方法
        subclassPrototype.override = io;

        // 将overrides上的属性复制到subclass.prototype
        override(subclass, overrides);

        // 为subclass添加静态属性extend，实现继承
        subclass.extend = function( o )
        {
            extend(subclass, o);
        };

        return subclass;

    };

})();
